using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO.Ports;

public class ReadTwoArduinoValuesExample : MonoBehaviour
{
    private SerialPort serialPort;
    // FR : Dans l'editeur, ecrivez le nom du port serial de votre arduino
    // EN : Into the editor, write your arduino serial port name 
    public string portName = "COM3";
    public int baudrate = 9600;

    // FR : Déclaration d'un tableau destiné à recevoir les valeurs des capteurs arduino.
    // EN : Create an array to receive the sensors values.
    public float[] values = {0,0};
    
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
                // FR : Lire les valeurs de l'arduino ligne par ligne. En séparant les valeurs à chaque virgule.
                // EN : Read the arduino's values line by line. Separating the values at each comma.
                string[] sensorValues = serialPort.ReadLine().Split(',');
                // FR : Convertir le texte en nombre decimale et le ranger dans la 1ere case du tableau de valeurs 
                // EN : Convert the text in float number and put it in the first array slot. 
                values[0] = float.Parse(sensorValues[0]);
                // FR : passer la valeur de 0 - 1023 à 0 - 1
                // EN : remap the value from 0 - 1023 to 0 - 1
                values[0] = values[0] / 1023;
                // FR : valeur entre 0 et 2
                // EN : value between 0 and 2
                values[0] *= 2;
                // FR : valeur entre -1 et 1
                // EN : value between -1 and 1
                values[0] -= 1;
                
                // FR : Convertir le texte en chiffre decimale et le ranger dans la 2ere case du tableau de valeurs 
                // EN : Convert the text in float number and put it into the second array slot. 
                values[1] = float.Parse(sensorValues[1]);
                // FR : passer la valeur de 0 - 1023 à 0 - 1
                // EN : remap the value from 0 - 1023 to 0 - 1
                values[1] = values[1] / 1023;
                // FR : valeur entre 0 et 2
                // EN : value between 0 and 2
                values[1] *= 2;
                // FR : valeur entre -1 et 1
                // EN : value between -1 and 1
                values[1] -= 1;
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
