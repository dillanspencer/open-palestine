
import requests
import matplotlib.pyplot as plt
import pandas as pd

BASE_URL = "https://data.techforpalestine.org/api"

def fetch_summary_data():
    """Fetch the summary data"""
    response = requests.get(f"{BASE_URL}/v3/summary.json")
    response.raise_for_status()
    return response.json()

def fetch_killed_in_gaza_data():
    """Fetch the list of people killed in Gaza since October 7th """
    response = requests.get(f"{BASE_URL}/v2/killed-in-gaza.json")
    response.raise_for_status()
    return response.json()

def fetch_press_killed_in_gaza_data():
    """Fetch the list of journalists killed in Gaza since October 7th """
    response = requests.get(f"{BASE_URL}/v2/press_killed_in_gaza.json")
    response.raise_for_status()
    return response.json()

def fetch_daily_casualties_gaza_data():
    """Fetch the daily casualties data"""
    response = requests.get(f"{BASE_URL}/v2/casualties_daily.json")
    response.raise_for_status()
    return response.json()

def fetch_daily_casualties_west_bank_data():
    """Fetch the daily casualties data"""
    response = requests.get(f"{BASE_URL}/v2/west_bank_daily.json")
    response.raise_for_status()
    return response.json()

def fetch_daily_infrastucture_damage_data():
    """Fetch the daily infrastructure damage data"""
    response = requests.get(f"{BASE_URL}/v3/infrastructure-damaged.json")
    response.raise_for_status()
    return response.json()


def plot_daily_casualties_gaza(data):
    """Plot the daily casualties in Gaza."""
    df = pd.DataFrame(data)
    df['report_date'] = pd.to_datetime(df['report_date'])
    df = df.set_index('report_date')
    
    plt.figure(figsize=(10, 5))
    plt.plot(df.index, df['injured'], marker='o')
    plt.title('Daily Casualties in Gaza')
    plt.xlabel('Date')
    plt.ylabel('Number of Casualties')
    plt.grid(True)
    plt.show()

def get_total_killed(summary_data):
    """Extract the total number of killed from the summary data."""
    gaza_killed = summary_data['gaza']['killed']['total']
    west_bank_killed = summary_data['west_bank']['killed']['total']
    total_killed = gaza_killed + west_bank_killed
    return total_killed

if __name__ == "__main__":
    try:
        summary_data = fetch_summary_data()
        killed = get_total_killed(summary_data)
        print(f"Total number of people killed: {killed}")
        
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")