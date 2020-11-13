import React, {useEffect, useState} from 'react';
import { httpRequest } from '../../../common/utils/axios';
import {Game, GameUser} from '../../../../../backend/src/types/Game'
import { LeaderboardItem } from './LeaderboardItem'
import { User } from '../../../../../backend/src/types/User';
import { RankedUser } from '../../../types/rankedUser';

interface RankingProps {
    gameUsers: Array<GameUser>,
    metric: string,
}


const Ranking = (props: RankingProps) => {

    const [ranking, setRanking] = useState<RankedUser[]>([]);

    useEffect(() => {
        //we have to wrap our async request in a synchronous method call bc useEffect is synchronous
        async function fetchData() {
            const {data} = await httpRequest({
                method: 'POST',
                endpoint: 'http://localhost:3000/healthy-competition/api/users/',
                data: {
                    user: props.gameUsers,
                    type: 'find-many'
                }
            });

            console.log(data);

            setRanking(data);
        }
        void fetchData();
    }, []);

    return (
        <div className="p-d-flex p-flex-column">
            {ranking.map((item, index) => (
            <LeaderboardItem userName={item.userName} value={item.value} metric={props.metric} ranking={item.ranking}  />))}
        </div>

    )
}

export default Ranking;