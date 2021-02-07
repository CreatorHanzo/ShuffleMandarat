import { IonCard, IonCardContent } from '@ionic/react'
import React from 'react'
import './Cell.scss'

export interface CellProps {
    text: string
}

export const Cell: React.FC<CellProps> = ({ text }) => {
    return (
        <div>
            <IonCard>
                <IonCardContent className="content">{text}</IonCardContent>
            </IonCard>
        </div>
    )
}
