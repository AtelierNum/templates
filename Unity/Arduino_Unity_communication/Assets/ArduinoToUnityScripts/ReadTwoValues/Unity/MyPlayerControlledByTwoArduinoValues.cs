using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyPlayerControlledByTwoArduinoValues : MonoBehaviour
{
    /**
     * FR :
     *    Cette variable fait le lien avec le script ReadTwoArduinoValuesExample.
     *    Il faut lui drag'n'drop l'objet Arduino dans l'editeur.
     * EN : 
     *    This variable is the link with the ReadTwoArduinoValuesExample script.
     *    You have to drag'n'drop the Arduino object into the editor.
    **/
    public ReadTwoArduinoValuesExample myArduino;

    // Update is called once per frame
    void Update()
    {
        // FR : Lecture de la 1er valeur
        // EN : Read the first value
        Debug.Log("value 1 : "+myArduino.values[0]);
        
        // FR : Lecture de la 2eme valeur
        // EN : Read the second value
        Debug.Log("value 2 : "+myArduino.values[1]);
    }
}
