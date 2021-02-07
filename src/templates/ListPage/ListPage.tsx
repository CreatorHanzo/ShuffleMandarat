import React, { useState } from 'react'
import { IonItem, IonList, IonSearchbar } from '@ionic/react'
import './ListPage.scss'
import '../../models/CellModel'
import { CellModel } from '../../models/CellModel'
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

export interface ListPageProps {
    list: Array<CellModel>
}

// const transItem = async () => {

//     const ret = await Storage.get({ key: 'user' });
//     setUser(JSON.parse(ret.value!));
// }

const printValue = async (value: string) => {
    console.log(value)
    await Storage.set({
        key: 'item',
        value: JSON.stringify({
            value: value,
        }),
    })
    const ret = await Storage.get({ key: 'item' })
    console.log(JSON.parse(ret.value!).value)
}

export const ListPage: React.FC<ListPageProps> = ({ list }) => {
    const [searchText, setSearchText] = useState('')
    // const [user, setUser] = useState('初期値');

    return (
        <div>
            <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                type="tel"
            ></IonSearchbar>
            <IonList>
                {
                    // eslint-disable-next-line array-callback-return
                    list.map((cell) => {
                        const regexp = new RegExp(searchText, 'i')
                        if (regexp.test(cell.text)) {
                            return (
                                <IonItem
                                    key={cell.id}
                                    type="button"
                                    mode="ios"
                                    onClick={() => {
                                        printValue(cell.text)
                                    }}
                                >
                                    {cell.text}
                                </IonItem>
                            )
                        }
                    })
                }
            </IonList>
        </div>
    )
}

export default ListPage
