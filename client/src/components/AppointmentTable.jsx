import React from "react";

const AppointmentTable = ({ appointments }) => {
  const formatter = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const formattedDateTime = dateObject.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDateTime;
  };
  const columns = [
    {
      dataField: "appId",
      text: "Appt ID",
    },
    {
      dataField: "patientName",
      text: "Patient Name",
    },
    {
      dataField: "patientDOB",
      text: "Patient DOB",
    },
    {
      dataField: "patientProb",
      text: "Problem",
    },
    {
      dataField: "patientDesc",
      text: "Description",
    },
    // {
    //   dataField: 'doctorId',
    //   text: 'Doctor ID',
    // },
    {
      dataField: "startTime",
      text: "Start Time",
    },
    {
      dataField: "endTime",
      text: "End Time",
    },
  ];

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.dataField}
              scope="col"
              className="bg-secondary text-white"
            >
              {column.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.appId}>
            {columns.map((column) => {
              if (
                column.dataField === "endTime" ||
                column.dataField === "startTime"
              ) {
                return (
                  <td key={column.dataField}>
                    {formatter(appointment[column.dataField])}
                  </td>
                );
              } else {
                return (
                  <td key={column.dataField}>
                    {appointment[column.dataField]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
