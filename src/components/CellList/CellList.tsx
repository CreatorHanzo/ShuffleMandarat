import {
    IonList,
    IonItem,
    IonLabel,
    IonFabButton,
    IonIcon,
    IonInput,
} from '@ionic/react'
import React, { useState } from 'react'
import './CellList.scss'
import '../../models/CellModel'
import { CellModel } from '../../models/CellModel'
import { add, removeOutline, chevronForwardOutline } from 'ionicons/icons'
import { useSelector, useDispatch } from 'react-redux'

export interface CellListProps {
    list: CellModel[]
    value: CellModel
    labelChange: () => void
    showMandarat: () => void
}

export const CellList: React.FC<CellListProps> = ({
    list,
    value,
    labelChange,
    showMandarat,
}) => {
    const [acc, setAcc] = useState(false)
    return (
        <div>
            <IonItem key={value.id}>
                <IonLabel key={value.id} onClick={labelChange}>
                    {value.text}
                </IonLabel>
                <IonFabButton
                    size="small"
                    color="secondary"
                    onClick={showMandarat}
                >
                    <IonIcon icon={chevronForwardOutline} />
                </IonFabButton>
                <IonIcon
                    slot="end"
                    icon={(() => {
                        if (acc) {
                            return removeOutline
                        } else {
                            return add
                        }
                    })()}
                    onClick={() => setAcc(!acc)}
                />
            </IonItem>
            {(() => {
                if (acc) {
                    let chidlren: JSX.Element[] = []
                    // eslint-disable-next-line array-callback-return
                    list.map((child) => {
                        if (child.parentId === value.id) {
                            chidlren.push(
                                <CellList
                                    list={list}
                                    value={child}
                                    labelChange={labelChange}
                                    showMandarat={showMandarat}
                                />
                            )
                        }
                    })
                    return chidlren
                }
            })()}
        </div>
    )
}

export default CellList
