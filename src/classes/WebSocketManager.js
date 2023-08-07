class WebSocketManager {
  constructor({ host, port, id, msgFunction }) {
    this.url = `ws://${host}:${port}`;
    this.connection = null;
    this.id = id;
    this.msgFunction = msgFunction;
    this.reconnectInterval = 5000; // Intervalo de reconexión en milisegundos (por ejemplo, 5 segundos)
  }

  openConnection() {
    this.connection = new WebSocket(this.url);

    this.connection.onopen = () => {
      console.log("WebSocket connection opened");
    };

    this.connection.onmessage = (event) => {
      try {
        const dataParsed = JSON.parse(event.data);
        let dataString;

        if (typeof dataParsed === "string") {
          dataString = event.data;
        } else if (dataParsed?.type === "Buffer") {
          const uint8Array = new Uint8Array(dataParsed.data);
          dataString = String.fromCharCode.apply(null, uint8Array);
        } else {
          throw new Error("Unsupported data type");
        }

        const jsonData = JSON.parse(dataString);
        if (
          jsonData.hasOwnProperty("sensor1") &&
          jsonData.hasOwnProperty("sensor2") &&
          jsonData.hasOwnProperty("sensor3") &&
          jsonData.hasOwnProperty("sensor4")
        ) {
          this.msgFunction([jsonData.sensor1, jsonData.sensor2, jsonData.sensor3, jsonData.sensor4]);
        }
      } catch (error) {
        if (error.name !== "SyntaxError") {
          throw error;
        }
      }
    };

    this.connection.onclose = () => {
      console.log("WebSocket connection closed");

      // Intenta reconectar después de un intervalo
      setTimeout(() => {
        this.openConnection();
      }, this.reconnectInterval);
    };
  }

  closeConnection() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }
}

export default WebSocketManager;
