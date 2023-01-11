using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class wallBehavior : MonoBehaviour
{
    [SerializeField] Vector3 sceneRotation;
    [SerializeField] GameObject theBigCube;
    [SerializeField] GameObject XRRig;
    [SerializeField] Vector3 XRRigPushback;

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Trigger"+other.name);

        theBigCube.transform.Rotate(sceneRotation, Space.World);
        XRRig.transform.Translate(XRRigPushback, Space.World);
    }
}
