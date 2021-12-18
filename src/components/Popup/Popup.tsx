import React from 'react'
import { IonAlert } from '@ionic/react'
import './Popup.scss'
export interface PopupProps {
    name: string
    isOpen: boolean
    header: string
    buttonText1: string
    buttonText2: string
    showAlert: () => void
    processing: () => void
}
// let allCell: Array<CellModel> = []

export const Popup: React.FC<PopupProps> = ({
    name,
    isOpen,
    processing,
    showAlert,
    header,
    buttonText1,
    buttonText2,
}) => {
    return (
        <div>
            <IonAlert
                isOpen={isOpen}
                onDidDismiss={showAlert}
                cssClass="my-popo-class"
                header={header}
                buttons={[
                    {
                        text: buttonText1,
                        role: 'cancel',
                        handler: () => {},
                    },
                    {
                        text: buttonText2,
                        handler: processing,
                    },
                ]}
            />
        </div>
    )
}

export default Popup
