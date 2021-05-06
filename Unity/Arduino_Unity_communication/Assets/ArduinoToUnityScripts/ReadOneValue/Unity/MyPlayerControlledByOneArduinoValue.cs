using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyPlayerControlledByOneArduinoValue : MonoBehaviour
{
    /**
     * FR :
     *    Cette variable fait le lien avec le script ReadOneArduinoValueExample.
     *    Il faut lui drag'n'drop l'objet Arduino dans l'editeur.
     * EN : 
     *    This variable is the link with the ReadOneArduinoValueExample script.
     *    You have to drag'n'drop the Arduino object into the editor.
    **/
    public ReadOneArduinoValueExample myArduino;

    // Update is called once per frame
    void Update()
    {
        // FR : Lecture de la valeur
        // EN : Read the value
        Debug.Log("value : "+myArduino.value);
    }
}
