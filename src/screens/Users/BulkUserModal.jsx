import React, { useLayoutEffect } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import NoDataComponent from "../../components/NoDataComp";

const BulkUserModal = (props) => {
  const hideModal = () => {
    props.setBulkUserModal(false);
    props?.setFilter({
      ...props?.filter,
      type: "Select",
    });
  };

  useLayoutEffect(() => {
    props?.setFilter({
      ...props?.filter,
      type: "pending",
      sortField: "created_at",
      value: "pending",
    });
  }, []);

  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="xl"
      show={props.bulkUserModal}
      centered
      onHide={hideModal}
    >
      <Modal.Body className="text-center p-4">
        {props?.Users?.length ? (
          <DataTable
            columns={[
              {
                name: <input type="checkbox" />,
                cell: (row, i) => <input type="checkbox" />,
                width: "50px",
                center: true,
              },
              ...props?.columns,
            ]}
            data={props?.Users?.length > 0 ? props?.Users : []}
            // noDataComponent={NoDataComponent}
            paginationPerPage={props?.filter?.limit || 10}
            paginationDefaultPage={props?.filter?.currentPage}
            paginationServer
            // progressPending={isLoading}
            paginationTotalRows={props?.filter?.totalDocuments}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            pagination
            onChangePage={props?.onNextPageClick}
          />
        ) : (
          <NoDataComponent />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BulkUserModal;
