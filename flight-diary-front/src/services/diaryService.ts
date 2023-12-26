import axios from "axios";
import { DiaryType } from "../types";

const baseUrl = 'http://localhost:3000/api/'

const getAll = async (): Promise<DiaryType[]> => {
    return axios.get(`${baseUrl}diaries`).then(response => response.data)
}

const addEntry = async (postData: Omit<DiaryType, 'id'>): Promise<DiaryType[]> => {
    return axios.post(`${baseUrl}diaries`, postData).then(response => response.data)
}

export default {
    getAll,
    addEntry
}