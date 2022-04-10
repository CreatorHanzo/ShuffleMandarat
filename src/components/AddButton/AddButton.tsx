import React from 'react'
import { IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { add } from 'ionicons/icons'
import './AddButton.scss'
// import { Plugins } from '@capacitor/core'
import { CellModel } from '../../models/CellModel'
// const { Storage } = Plugins
import { Storage } from '@capacitor/storage'

export interface AddButtonProps {}

const addTopParent = async () => {
    // 現状のmaxId+1を設定する
    const maxIdStr = await Storage.get({ key: 'maxId' })
    let maxId = 1
    if (JSON.parse(maxIdStr.value!)) {
        maxId = JSON.parse(maxIdStr.value!) + 1
    }
    await Storage.set({
        key: 'maxId',
        value: JSON.stringify(maxId),
    })

    // 追加ボタンが押されたときに、トップレベルの親を作成
    const topParent: CellModel = {
        parentId: 0,
        id: maxId,
        text: '',
    }
    await Storage.set({
        key: 'topParent',
        value: JSON.stringify(topParent),
    })
    // 全ての要素を格納している配列を更新
    let allCell: Array<CellModel> = []
    const allCellStr = await Storage.get({ key: 'allCell' })
    if (JSON.parse(allCellStr.value!)) {
        allCell = JSON.parse(allCellStr.value!)
    }
    allCell.push(topParent)
    await Storage.set({
        key: 'allCell',
        value: JSON.stringify(allCell),
    })
}

export const AddButton: React.FC<AddButtonProps> = () => {
    return (
        <div>
            <IonFab
                vertical="bottom"
                horizontal="end"
                slot="fixed"
                onClick={addTopParent}
            >
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </div>
    )
}

export default AddButton
