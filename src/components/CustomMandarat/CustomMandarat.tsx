import {
    IonAlert,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonPage,
    IonRow,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import './CustomMandarat.scss'
import { CellModel } from '../../models/CellModel'
import { Plugins } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import { Popver } from '../Popver/Popver'
import { ChildPopover } from '../Popver/ChildPopover'
import { Popup } from '../Popup/Popup'
import { add } from 'ionicons/icons'

const { Storage } = Plugins
let list1: Array<CellModel> = []

export interface CustomMandaratProps {
    yoso: CellModel[]
}

export const CustomMandarat: React.FC<CustomMandaratProps> = ({ yoso }) => {
    return (
        // <IonContent>
        <IonGrid className="mandarat-grid ion-no-padding">
            <IonRow className="ion-no-padding">
                {(() => {
                    if (yoso[0]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                            >
                                {yoso[0].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={0}></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso[1]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                                key={1}
                            >
                                {yoso[1].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={1}></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso[2]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                            >
                                {yoso[2].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={2}></IonCol>
                    }
                })()}
            </IonRow>
            <IonRow className="ion-no-padding">
                {(() => {
                    if (yoso[3]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                            >
                                {yoso[3].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={3}></IonCol>
                    }
                })()}
                <IonCol
                    id="animated-example"
                    className="animated flipInX parent-col"
                    key={10}
                ></IonCol>
                {(() => {
                    if (yoso[4]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                                key={4}
                            >
                                {yoso[4].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={4}></IonCol>
                    }
                })()}
            </IonRow>
            <IonRow className="ion-no-padding">
                {(() => {
                    if (yoso[5]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                                key={5}
                            >
                                {yoso[5].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={5}></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso[6]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                                key={6}
                            >
                                {yoso[6].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={6}></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso[7]) {
                        return (
                            <IonCol
                                id="animated-example"
                                className="animated flipInX text-col"
                                key={7}
                            >
                                {yoso[7].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol key={7}></IonCol>
                    }
                })()}
            </IonRow>
        </IonGrid>
        // </IonContent>
    )
}
export default CustomMandarat
