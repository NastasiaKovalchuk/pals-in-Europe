import { useParams } from "react-router";
import { YMaps, Map } from "react-yandex-maps";

type MastersValue = {
  value: string;
};

export const ShowMasters = () => {
  const { value } = useParams<MastersValue>();
  return (
    <div>
      <div>
          <select name="category" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </select>
          <select name="location" id="">
              <option value="Amsterdam">Amsterdam</option>
              <option value="Rotterdam">Rotterdam</option>
              <option value="Gouda">Gouda</option>
          </select>
      </div>
      <YMaps>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
      </YMaps>
    </div>
  );
};
