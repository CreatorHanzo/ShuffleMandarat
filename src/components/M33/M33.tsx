import React from 'react'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
import './M33.scss'
import { CellModel } from '../../models/CellModel'
export interface M33Props {
    yoso?: { parent: CellModel; children: Array<CellModel> }
}

export const M33: React.FC<M33Props> = ({ yoso }) => {
    return (
        <IonGrid className="grid1">
            <IonRow>
                {(() => {
                    if (yoso?.children[0]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[0].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.children[1]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[1].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.children[2]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[2].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
            </IonRow>
            <IonRow>
                {(() => {
                    if (yoso?.children[3]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[3].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.parent) {
                        return (
                            <IonCol className="parent">
                                {yoso.parent.text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.children[4]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[4].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
            </IonRow>
            <IonRow>
                {(() => {
                    if (yoso?.children[5]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[5].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.children[6]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[6].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
                {(() => {
                    if (yoso?.children[7]) {
                        return (
                            <IonCol className="col">
                                {yoso.children[7].text}
                            </IonCol>
                        )
                    } else {
                        return <IonCol className="nocol"></IonCol>
                    }
                })()}
            </IonRow>
        </IonGrid>
    )
}

export default M33
