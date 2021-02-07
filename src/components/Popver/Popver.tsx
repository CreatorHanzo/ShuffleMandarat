import React from 'react'
import { connect } from 'react-redux'
import { IonItem, IonPopover } from '@ionic/react'

export interface PopverPops {
    isOpen: boolean
    event: any
    parentId: number | undefined
    setShowPopover: () => void
    moveParent: () => void
    deleteChild: () => void
    editParent: () => void
}

export const Popver: React.FC<PopverPops> = ({
    isOpen,
    event,
    parentId,
    setShowPopover,
    moveParent,
    editParent,
    deleteChild,
}) => {
    return (
        <IonPopover
            cssClass="my-popo-class"
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
                親要素へ移動
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    editParent()
                }}
            >
                編集
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    deleteChild()
                }}
            >
                削除
            </IonItem>
        </IonPopover>
    )
}

export default connect((state) => state)(Popver)
