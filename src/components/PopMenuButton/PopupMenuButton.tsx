import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'
import './PopupMenuButton.scss'

export interface PopupMenuButtonProps {
    list: number[]
    setShowNumber: () => void
}

export const PopupMenuButton: React.FC<PopupMenuButtonProps> = ({
    list,
    setShowNumber,
}) => {
    return (
        <div>
            <IonItem lines="none" className="ion-item-select">
                <IonLabel>表示する数</IonLabel>
                <IonSelect value={9} onIonChange={setShowNumber}>
                    {list.map((value) => {
                        return (
                            <IonSelectOption value={value}>
                                {value}
                            </IonSelectOption>
                        )
                    })}
                </IonSelect>
            </IonItem>
        </div>
    )
}

// export default PopupMenuButton
