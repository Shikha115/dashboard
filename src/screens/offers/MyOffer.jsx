import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";

import AddModalComp from "./AddModalComp";
import Loader from "../../components/Loader";
import useOfferHook from "./useOfferHook";
import DeleteOfferModal from "./DeleteOffer";



function MyOffer() {
  const {
    searchFilter,
    currentCategory,
    setCurrentData,
    setAddModal,
    isLoading,
    columns,
    Offers,
    theme,
    deleteModal,
    setDeleteModal,
    setpassword,
    deleteData,
    category_id,
    addModal,
    currentData,
    addonData,
    setAddonData,
    handleSubmit,
    Data,
  } = useOfferHook();

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="manage-bank">
            <div className="page-title-box">
              <div className="page-title-right">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search..."
                        onChange={searchFilter}
                      />
                      <span className="search-icon">
                        <CiSearch className="text-muted" />
                      </span>
                    </div>
                  </form>
                </div>
                {currentCategory?.name === "All" ? null : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCurrentData(currentCategory?.offer_data);
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add {currentCategory?.name}
                  </button>
                )}
              </div>
              <h4 className="page-title">Manage {currentCategory?.name}</h4>
            </div>
            {isLoading ? <Loader /> : null}
            <DataTable
              columns={columns}
              data={Offers}
              pagination
              paginationRowsPerPageOptions={[30, 60, 90, 120]}
              paginationPerPage={30}
            />
          </div>
        </div>
      </div>
      <DeleteOfferModal
        theme={theme}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        setpassword={setpassword}
        deleteData={deleteData}
      />
      <AddModalComp
        theme={theme}
        category_id={category_id}
        addModal={addModal}
        setAddModal={setAddModal}
        currentData={currentData}
        setCurrentData={setCurrentData}
        addonData={addonData}
        setAddonData={setAddonData}
        currentCategory={currentCategory}
        handleSubmit={handleSubmit}
        Data={Data}
      />
    </>
  );
}

export default MyOffer;
