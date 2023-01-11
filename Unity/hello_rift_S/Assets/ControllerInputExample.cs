using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class ControllerInputExample : MonoBehaviour
{
    [SerializeField] private InputActionProperty myChosenAction;

    void Update()
    {
        Vector2 value = myChosenAction.action.ReadValue<Vector2>();
//        Debug.Log(value);
    }

    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log(collision.gameObject.name);
    }
}
