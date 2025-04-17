import React, { useLayoutEffect, useState } from 'react'
import useDataStore from '../../store/dataStore'
import axios from 'axios'
import { apis } from '../../utils/URL'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import SmallVideoFrame from '../../components/SmallVideoFrame'
import useAuthStore from '../../store/authStore'
import useToastStore from '../../store/toastStore'
let tutTimer
let searchTimer


const useTutorialHook = () => {
    const { tutorials, setTutorial } = useDataStore()
    const [isLoading, setisLoading] = useState(true)
    const { setToastData } = useToastStore();
    const { theme } = useAuthStore();
    const {
        profile: { access },
    } = useAuthStore();
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState({ type: "", state: false });
    const [currentData, setCurrentData] = useState();
    const [UpdatedData, setUpdatedData] = useState({});

    const [filter, setFilter] = useState({
        search: "",
        currentPage: 1,
        nextPage: 2,
        limit: 10,
        totalDocuments: 10,
        sortField: "",
        sortOrder: "desc",
    });

    useLayoutEffect(() => {
        fetchWithParams()
        let tutTimer = setTimeout(() => {
            setisLoading(false)
        }, 500);
        return clearTimeout(tutTimer)
    }, [])

    const search = (val) => {
        let value = val?.toLowerCase();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            fetchWithParams(filter.page, value)
        }, 500);
    }

    const fetchWithParams = (page, search) => {
        setisLoading(true);
        let params =
            "?search=" +
            (filter?.search || search || "") +
            "&limit=" +
            filter?.limit +
            "&type=" +
            (filter?.type || "") +
            "&page=" +
            (page ? page : filter?.currentPage)

        axios
            .get(apis?.getAllTutorials + params)
            .then((res) => {
                setFilter({ ...filter, ...res?.data?.pagination });
                setTutorial(res?.data?.data);
                setisLoading(false);
            })
            .catch((err) => {
                setisLoading(false);
            });
    };


    const onNextPageClick = (page) => {
        fetchWithParams(page);
    };

    const getAllTutorials = async () => {
        clearTimeout(tutTimer)
        const res = await axios.get(apis.getAllTutorials)
        tutTimer = setTimeout(() => {
            setisLoading(false)
        }, 500);
        setTutorial(res?.data.data)
    }

    const updateRank = async (id, rank) => {
        axios
            .post(apis.updateTutorial, { id, rank: Number(rank) })
            .then((e) => {
                setToastData({ message: e.data.message });
            })
            .catch((err) => {
                setToastData({ message: "Failed to Update" });
            });
    };

    const updateStatus = async (id, status) => {
        axios
            .post(apis.updateTutorial, { id, status })
            .then((e) => {
                setToastData({ message: e.data.message });
            })
            .catch((err) => {
                setToastData({ message: "Failed to Update" });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addModal.type === "add") {
            AddData();
        } else {
            UpdateData();
        }
    };

    const DeleteBank = async () => {
        axios
            .post(apis.deleteTutorial, { id: currentData?._id })
            .then(async (e) => {
                await getAllTutorials();
                setCurrentData({});
                setToastData({
                    color: "#47ad77",
                    message: `Bank Deleted Successfully`,
                });
                setDeleteModal(false);
            })
            .catch((err) => {
                // console.log(err);
                setToastData({
                    color: "#d03f3f",
                    message: `Failed to delete bank`,
                });
            });
    };

    const AddData = async () => {
        const {
            status = false,
            title = "",
            video = ""
        } = UpdatedData;

        if (!status || !title || !video) {
            setToastData({
                color: "red",
                message: "All details are required",
            });
            return;
        }

        let data = {
            ...UpdatedData,
        };

        axios
            .post(apis.createTutorial, data)
            .then(async (e) => {
                setCurrentData({});
                setUpdatedData({});
                setToastData({
                    color: "#00ff1e",
                    message: `Tutorial Added Successfully`,
                });
                await getAllTutorials();

                setAddModal({ ...addModal, state: false });
                setTimeout(() => { }, 2000);
            })
            .catch((err) => {
                // console.log(err);
                setToastData({
                    color: "red",
                    message: `Failed to update Tutorial! Try Again`,
                });
            });
    };

    const UpdateData = async () => {
        let data = {
            id: currentData._id,
            ...UpdatedData,
        };

        axios
            .post(apis.updateTutorial, data)
            .then(async (e) => {
                setCurrentData({});
                setUpdatedData({});
                await getAllTutorials();
                setToastData({
                    color: "#49e45b",
                    message: `Tutorial Updated Successfully`,
                });
                setAddModal({ ...addModal, state: false });
            })
            .catch((err) => {
                // console.log(err);
                setToastData({
                    color: "red",
                    message: `Failed to update Tutorial`,
                });
            });
    };


    const columns = [
        {
            name: "S.No",
            selector: (row, id) => id + 1,
            width: "70px",
        },
        {
            name: "Name",
            center: true,
            width: "auto",
            selector: (row) => row.title,
        },
        {
            name: "Video",
            center: true,
            width: "auto",
            selector: (row) => <SmallVideoFrame videoId={row?.video} />,
        },
        {
            name: "Type",
            center: true,
            width: "auto",
            selector: (row) => row?.type,
        },
        {
            name: "Status",
            center: true,
            width: "auto",
            // style: { width: 1000 },
            cell: (row) => (
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        defaultChecked={row?.status}
                        onChange={(e) => {
                            let val = e.target.checked;
                            updateStatus(row?._id, val);
                            row.status = val;
                        }}
                    />
                </div>
            ),
        },
        {
            name: "Rank",
            center: true,
            width: "auto",
            cell: (row) => (
                <div>
                    <input
                        defaultValue={row?.rank}
                        type="number"
                        className="form-control"
                        style={{ width: 70 }}
                        onChange={(e) => {
                            let val = e.target.value;
                            updateRank(row?._id, val);
                            row.rank = val;
                        }}
                    />
                </div>
            ),
        },

        {
            // selector: (row) => row.year,
            name: "Action",
            center: true,
            width: "auto",
            cell: (row) => (
                <div className="custom-table-btn">
                    <button
                        className="btn btn-purple"
                        onClick={() => {
                            if (!access?.banner?.edit) {
                                setToastData({
                                    message: "You don't have edit access",
                                    color: "purple",
                                });
                                return;
                            }
                            setAddModal({ type: "edit", state: true });
                            setCurrentData(row);
                        }}
                    >
                        <MdEdit className="fs-18" />
                    </button>
                    <Link
                        className="btn btn-pink"
                        to="#"
                        onClick={(e) => {
                            if (!access?.banner?.delete) {
                                setToastData({
                                    message: "You don't have edit access",
                                    color: "red",
                                });
                                return;
                            }
                            setCurrentData(row);
                            e.preventDefault();
                            setDeleteModal(!deleteModal);
                        }}
                    >
                        <MdDelete className="fs-18" />
                    </Link>
                </div>
            ),
        },
    ];

    return {
        isLoading,
        tutorials,
        access,
        search,
        setToastData,
        setCurrentData,
        setUpdatedData,
        setAddModal,
        columns,
        theme,
        addModal,
        currentData,
        UpdatedData,
        handleSubmit,
        deleteModal,
        setDeleteModal,
        DeleteBank,
        filter,
        onNextPageClick
    }
}

export default useTutorialHook

