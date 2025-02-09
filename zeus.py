import os
import asyncio
import csv
import json
import requests
import discord
import pytz
import time
import yfinance as yf
from discord.ext import commands
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TOKEN = os.getenv("DISCORD_BOT_TOKEN")
CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))
POLYGON_API_KEY = os.getenv("POLYGON_API_KEY")
BASE_URL = "https://api.polygon.io"

# Trading Parameters
MIN_BID = 0.01
MAX_BID = 0.10
TARGET_MULTIPLIER = 2
LIQUIDITY_THRESHOLD = 5  # Minimum Volume & Open Interest
CHECK_INTERVAL = 1800  # 30 Minutes

# Set up Discord bot
intents = discord.Intents.default()
intents.messages = True
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def is_market_open():
    """Checks if the market is open, including premarket."""
    now = datetime.now(pytz.timezone("America/New_York"))
    premarket_open = now.replace(hour=4, minute=0, second=0, microsecond=0)
    after_hours_close = now.replace(hour=20, minute=0, second=0, microsecond=0)
    return now.weekday() < 5 and premarket_open <= now <= after_hours_close

intents = discord.Intents.default()
bot = discord.Client(intents=intents)

async def test_channel():
    await bot.login(TOKEN)
    await bot.connect()
    await asyncio.sleep(5)  # Give time to connect

    channel = bot.get_channel(CHANNEL_ID)
    if channel:
        print(f"✅ Bot found the channel: {channel.name}")
    else:
        print("❌ Error: Bot could NOT find the channel. Check permissions or ID.")

    await bot.close()

asyncio.run(test_channel())

async def fetch_with_retries(url, attempt=1):
    """Handles API requests with retry logic."""
    if attempt > 5:
        print(f"Max retries reached for {url}")
        return None
    try:
        response = requests.get(url, params={"apiKey": POLYGON_API_KEY})
        return response.json()
    except Exception as e:
        print(f"Error fetching {url}: {e}. Retrying...")
        await asyncio.sleep(60)
        return await fetch_with_retries(url, attempt + 1)

async def get_top_500_tickers():
    """Fetches the top 500 stocks that trade options."""
    url = f"{BASE_URL}/v3/reference/tickers?active=true&market=stocks&limit=500"
    data = await fetch_with_retries(url)
    return [stock["ticker"] for stock in data.get("results", []) if stock.get("has_options", False)]

async def find_trade_opportunities():
    """Scans top 500 stocks for good Call & Put options."""
    if not is_market_open():
        print("Market is closed! Skipping scan.")
        return []
    
    tickers = await get_top_500_tickers()
    trade_opportunities = []
    for ticker in tickers[:50]:  # Limit to 50 tickers per scan
        url = f"{BASE_URL}/v3/snapshot/options/{ticker}"
        data = await fetch_with_retries(url)
        if not data or "results" not in data:
            continue
        for option in data["results"]:
            bid = option.get("bid_price", 0)
            volume = option.get("volume", 0)
            open_interest = option.get("open_interest", 0)
            if MIN_BID <= bid <= MAX_BID and volume >= LIQUIDITY_THRESHOLD and open_interest >= LIQUIDITY_THRESHOLD:
                option_type = "Call" if option["contract_type"] == "call" else "Put"
                trade_opportunities.append(f"🚀 {ticker} {option['strike_price']}{option_type} Exp: {option['expiration_date']} - Buy at ${bid}, Sell at ${bid * TARGET_MULTIPLIER}")
    return trade_opportunities

@bot.event
async def on_ready():
    print(f"⚡ Zeus is online! Connected as {bot.user}")

    await asyncio.sleep(5)  # Ensure bot is fully connected before checking channels

    # Get the channel
    channel = bot.get_channel(CHANNEL_ID)

    if channel is None:
        print(f"❌ Error: Could not find Discord channel (ID: {CHANNEL_ID}).")
        print("🔎 Make sure the bot is in the right server and has permissions!")
        return  # Stop execution if channel is invalid

    await channel.send("🔄 Zeus is now online and scanning for trade opportunities every 30 minutes.")

    while True:
        if not is_market_open():
            print("⚠️ Market is closed. Waiting until pre-market hours...")
            await asyncio.sleep(1800)  # Wait 30 minutes before checking again
            continue

        print("🔍 Running 30-minute automated trade scan...")
        trades = await find_trade_opportunities()

        if trades:
            await channel.send("\n".join(trades))
        else:
            await channel.send("⏳ No trade opportunities found. Rechecking in 30 minutes...")

        await asyncio.sleep(1800)  # Wait 30 minutes before next check

bot.run(TOKEN)
