import DataTable from "react-data-table-component";
import { CiSearch, CiWarning } from "react-icons/ci";

import AddModalComp from "./AddModalComp";
import Loader from "../../components/Loader";
import useOfferHook from "./useOfferHook";
import DeleteOfferModal from "./DeleteOffer";
import { getAccessName } from "../../utils/helperfunctions";

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
    access,
    Pagination,
    onNextPageClick,
  } = useOfferHook();

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          {!access?.offer?.read ? (
            <div
              style={{ height: "40vh" }}
              className="manage-bank d-flex justify-content-center align-items-center "
            >
              <h1 className="item">No Access Provided</h1>
            </div>
          ) : (
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
                  {currentCategory?.name === "All" ||
                  !access.offer?.edit ? null : (
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
                <h4 className="page-title">
                  Manage {currentCategory?.name}{" "}
                  <h4>({getAccessName(access?.offer)})</h4>
                </h4>
              </div>
              {isLoading ? <Loader /> : null}
              <DataTable
                columns={columns}
                data={Offers}
                pagination
                progressPending={isLoading}
                paginationServer
                paginationTotalRows={Pagination?.totalDocuments}
                paginationPerPage={Pagination?.limit ?? 10}
                paginationDefaultPage={Pagination?.currentPage}
                onChangePage={onNextPageClick}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
              />
            </div>
          )}
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
