import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

// const getPatient = async (id: string) => {
//   const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
//   return data;
// };

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

export default {
  getAll,
  // create,
  // getPatient
};

