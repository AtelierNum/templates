using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO.Ports;

public class ReadOneArduinoValueExample : MonoBehaviour
{
    private SerialPort serialPort;
    // FR : Dans l'editeur, ecrivez le nom du port serial de votre arduino
    // EN : Into the editor, write your arduino serial port name 
    public string portName = "COM3";
    public int baudrate = 9600;

    public float value = 0;
    
    // Start is called before the first frame update
    void Start()
    {
        serialPort = new SerialPort(portName, baudrate);
        
        try
        {

            serialPort.Open();
        }
        catch
        {
            Debug.Log("Arduino not connected");
        }

        try
        {

            serialPort.ReadTimeout = 10;

        }
        catch
        {
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (serialPort.IsOpen)
        {
            try
            {
                // FR : Lire les valeures de l'arduino par ligne.
                // EN : Read the arduino's values line by line.
                string sensorValue = serialPort.ReadLine();
                Debug.Log(sensorValue);
                // FR : Convertir le texte en chiffre decimale et le ranger dans la 2ere case du tableau de valeurs 
                // EN : Convert the text in float number and put it into the second array slot. 
                value = float.Parse(sensorValue);
                // FR : passer la valeur de 0 - 1023 à 0 - 1
                // EN : remap the value from 0 - 1023 to 0 - 1
                value = value / 1023;
                // FR : valeur entre 0 et 2
                // EN : value between 0 and 2
                value *= 2;
                // FR : valeur entre -1 et 1
                // EN : value between -1 and 1
                value -= 1;
            }
            catch (System.Exception e)
            {
            }
            
        }
    }
    
    private void OnDisable()
    {
        serialPort.Close();
    }
}
