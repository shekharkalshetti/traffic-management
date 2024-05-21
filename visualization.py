import json
import threading
import websocket
import matplotlib.pyplot as plt

# WebSocket server URL
WS_URL = "ws://localhost:3000"

regions = []
num_of_vehicles = []


def on_message(ws, message):
    data = json.loads(message)
    region = data["partition"]
    vehicles = data["numOfVehicles"]
    update_visualization(region, vehicles)


def update_visualization(region, vehicles):
    if region in regions:
        idx = regions.index(region)
        num_of_vehicles[idx] = vehicles
    else:
        regions.append(region)
        num_of_vehicles.append(vehicles)

    plt.bar(regions, num_of_vehicles, color='blue')
    plt.xlabel('Region')
    plt.ylabel('Number of Vehicles')
    plt.title('Real-time Traffic Visualization')
    plt.xticks(regions)
    plt.show()


def start_websocket():
    ws = websocket.WebSocketApp(WS_URL, on_message=on_message)
    ws.run_forever()


websocket_thread = threading.Thread(target=start_websocket)
websocket_thread.start()
