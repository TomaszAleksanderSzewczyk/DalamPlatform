import { useQuery } from "react-query";
import useTeamData from "../useTeams";

const useTeamQuery = (id) => {
    const { getOne } = useTeamData();
    const query = useQuery(["team", id], () => getOne(id));

    return query;
}

export default useTeamQuery;
