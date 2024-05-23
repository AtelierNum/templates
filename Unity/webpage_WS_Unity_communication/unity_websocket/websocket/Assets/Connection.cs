using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using NativeWebSocket;

public class Connection : MonoBehaviour
{
     [SerializeField] private String serverAdress = "ws://localhost:8080";

    WebSocket websocket;

    async void Start()
    {
        websocket = new WebSocket(serverAdress);

        websocket.OnOpen += () =>
        {
            Debug.Log("Connection open!");
        };

        websocket.OnError += (e) =>
        {
            Debug.Log("Error! " + e);
        };

        websocket.OnClose += (e) =>
        {
            Debug.Log("Connection closed!");
            Invoke("Reconnect", 2.0f);
        };

        // expects messages like "player1,moveX,1.0" or "player2,fire"
        websocket.OnMessage += (bytes) =>
        {
            var message = System.Text.Encoding.UTF8.GetString(bytes);
            Debug.Log("Message: " + message);
            String[] data = message.Split(",");

            String username = data[0];
            String messageType = data[1];

            switch (messageType) {
                case ("fire"):
                    Debug.Log(username + " is firing");
                    break;
                case ("jump"):
                    Debug.Log(username + " is jumping");
                    break;
                case ("moveX"):
                    Debug.Log(data[2]);
                    float xDirection = Single.Parse(data[2], System.Globalization.CultureInfo.InvariantCulture);
                    Debug.Log(xDirection);
                    break;
                default:
                    Debug.LogWarning("unknown message type:" + messageType);
                    break;
            }
        };

        // waiting for messages
        await websocket.Connect();
    }

    void Update()
    {
#if !UNITY_WEBGL || UNITY_EDITOR
        websocket.DispatchMessageQueue();
#endif
    }

    // method showcasing how to send stuff, in case you want to
    async void SendWebSocketMessage()
    {
        if (websocket.State == WebSocketState.Open)
        {
            // Sending bytes
            await websocket.Send(new byte[] { 10, 20, 30 });

            // Sending plain text
            await websocket.SendText("plain text message");
        }
    }

    private async void OnApplicationQuit()
    {
        await websocket.Close();
    }

    private async void Reconnect()
    {
        await websocket.Connect();
    }

}