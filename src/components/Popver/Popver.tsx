import React from 'react'
import { connect } from 'react-redux'
import { IonIcon, IonItem, IonPopover } from '@ionic/react'
import { chevronBack, pencilOutline } from 'ionicons/icons'

export interface PopverPops {
    isOpen: boolean
    event: any
    parentId: number | undefined
    setShowPopover: () => void
    moveParent: () => void
    editParent: () => void
}

export const Popver: React.FC<PopverPops> = ({
    isOpen,
    event,
    parentId,
    setShowPopover,
    moveParent,
    editParent,
}) => {
    return (
        <IonPopover
            event={event}
            isOpen={isOpen}
            onDidDismiss={() => setShowPopover()}
        >
            <IonItem
                button
                onClick={() => {
                    moveParent()
                }}
                disabled={parentId === 0}
            >
                <IonIcon icon={chevronBack}></IonIcon>
                移動
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    editParent()
                }}
            >
                <IonIcon icon={pencilOutline}></IonIcon>
                編集
            </IonItem>
        </IonPopover>
    )
}

export default connect((state) => state)(Popver)
