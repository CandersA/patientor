import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getOne = async (code: string) => {
  const { data } = await axios.get<Diagnosis | undefined>(
    `${apiBaseUrl}/diagnoses/${code}`
  );

  return data;
};

export default {
  getOne
};
