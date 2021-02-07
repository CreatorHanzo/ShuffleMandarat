import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import {
    IonPage,
    IonList,
    IonItem,
    IonContent,
    IonButton,
    IonTitle,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonFab,
    IonFabButton,
    IonToolbar,
} from '@ionic/react'
import './Tab2.scss'
import { CellModel } from '../models/CellModel'
import { reloadOutline, shuffleOutline } from 'ionicons/icons'
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins
let list1: Array<CellModel> = []
// let newArray: Array<CellModel> = []
const numList: number[] = [2, 3, 4, 5, 6, 7, 8, 9]

const Tab2: React.FC = () => {
    const [showNumber, setShowNumber] = useState(9)
    const random = useSelector(
        (state: { randomListReducer: CellModel[] }) => state
    )
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('レンダリングした(ホーム)')
        console.log('更新後', random.randomListReducer)
        initialize()
    })

    const randomSelect = (array: Array<CellModel>, num: number) => {
        const copyArray = [...array]
        dispatch({ type: 'createRandomlist', originList: copyArray, num: num })
    }

    const initialize = async () => {
        const allCellStr = await Storage.get({ key: 'allCell' })

        if (JSON.parse(allCellStr.value!)) {
            list1 = JSON.parse(allCellStr.value!)
            console.log('list1', list1)
        }
    }
    return (
        <IonPage className="shuffle-page">
            <IonToolbar className="shuffle-tool-bar" mode="ios">
                <IonTitle>SHUFFLE</IonTitle>
            </IonToolbar>
            <IonItem lines="none" className="ion-no-padding ion-item-select">
                <IonLabel>表示する数</IonLabel>
                <IonSelect
                    value={showNumber}
                    onIonChange={(e) => {
                        setShowNumber(e.detail.value)
                        randomSelect(list1, e.detail.value)
                    }}
                >
                    {numList.map((value: React.ReactNode) => {
                        return (
                            <IonSelectOption value={value}>
                                {value}
                            </IonSelectOption>
                        )
                    })}
                </IonSelect>
            </IonItem>
            <IonContent className="shuffle-content">
                <IonGrid className="random-list-grid">
                    <IonRow className="ion-no-padding">
                        {(() => {
                            if (random.randomListReducer[0]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={0}
                                    >
                                        {random.randomListReducer[0].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={0}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[1]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={1}
                                    >
                                        {random.randomListReducer[1].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={1}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[2]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={2}
                                    >
                                        {random.randomListReducer[2].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={2}></IonCol>
                            }
                        })()}
                    </IonRow>
                    <IonRow className="ion-no-padding">
                        {(() => {
                            if (random.randomListReducer[3]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={3}
                                    >
                                        {random.randomListReducer[3].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={3}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[4]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={4}
                                    >
                                        {random.randomListReducer[4].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={4}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[5]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={5}
                                    >
                                        {random.randomListReducer[5].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={5}></IonCol>
                            }
                        })()}
                    </IonRow>
                    <IonRow className="ion-no-padding">
                        {(() => {
                            if (random.randomListReducer[6]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={6}
                                    >
                                        {random.randomListReducer[6].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={6}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[7]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={7}
                                    >
                                        {random.randomListReducer[7].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={7}></IonCol>
                            }
                        })()}
                        {(() => {
                            if (random.randomListReducer[8]) {
                                return (
                                    <IonCol
                                        id="animated-example"
                                        className="animated flipInX text-col"
                                        key={8}
                                    >
                                        {random.randomListReducer[8].text}
                                    </IonCol>
                                )
                            } else {
                                return <IonCol key={8}></IonCol>
                            }
                        })()}
                    </IonRow>
                </IonGrid>

                {/* <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton
                        className="reload-button"
                        onClick={() => randomSelect(list1, showNumber)}
                    >
                        <IonIcon icon={reloadOutline} size="large" />
                    </IonFabButton>
                </IonFab> */}
            </IonContent>
            <IonButton
                className="shuffle-button"
                shape="round"
                mode="ios"
                onClick={() => randomSelect(list1, showNumber)}
            >
                <IonIcon slot="start" icon={shuffleOutline} />
                Shuffule
            </IonButton>
        </IonPage>
    )
}

export default connect((state) => state)(Tab2)
