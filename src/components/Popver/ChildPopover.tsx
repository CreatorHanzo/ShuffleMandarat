import React from 'react'
import { connect } from 'react-redux'
import { IonItem, IonPopover } from '@ionic/react'

export interface ChildPopoverProps {
    isOpen: boolean
    event: any
    setShowPopover: () => void
    moveChild: () => void
    deleteChild: () => void
    editChild: () => void
}

export const ChildPopover: React.FC<ChildPopoverProps> = ({
    isOpen,
    event,
    setShowPopover,
    moveChild,
    deleteChild,
    editChild,
}) => {
    return (
        <IonPopover
            cssClass="my-popo-child-class"
            event={event}
            isOpen={isOpen}
            onDidDismiss={() => setShowPopover()}
        >
            <IonItem
                button
                onClick={() => {
                    moveChild()
                }}
            >
                移動
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    editChild()
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

export default connect((state) => state)(ChildPopover)
