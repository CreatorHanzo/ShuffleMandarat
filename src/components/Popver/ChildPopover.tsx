import React from 'react'
import { connect } from 'react-redux'
import { IonIcon, IonItem, IonPopover } from '@ionic/react'
import { chevronForward, pencilOutline, trash } from 'ionicons/icons'

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
                <IonIcon icon={chevronForward}></IonIcon>
                移動
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    editChild()
                }}
            >
                <IonIcon icon={pencilOutline}></IonIcon>
                編集
            </IonItem>
            <IonItem
                button
                onClick={() => {
                    deleteChild()
                }}
            >
                <IonIcon icon={trash}></IonIcon>
                削除
            </IonItem>
        </IonPopover>
    )
}

export default connect((state) => state)(ChildPopover)
