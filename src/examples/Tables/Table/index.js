import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns = [], rows = [{}] }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize="14px"
        fontWeight="bold"
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        <SoftTypography
          variant="caption"
          fontWeight="bold"
          sx={{
            whiteSpace: "nowrap",     // ✅ One line only
            overflow: "visible",      // ✅ Allow full text, no cutting
            textOverflow: "unset",    // ✅ Disable ellipsis
            textAlign: "center",
            display: "block",
          }}
        >
          {name.toUpperCase()}
        </SoftTypography>
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={2}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            {React.isValidElement(row[name]) ? (
              row[name]  // Render JSX like <img /> directly
            ) : (
              <SoftTypography
                variant="body2"
                fontWeight="medium"
                color="secondary"
                sx={{ display: "inline-block", width: "max-content" }}
              >
                {row[name]}
              </SoftTypography>
            )}
          </SoftBox>
        );

      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={2}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftTypography
              variant="body2"
              fontWeight="medium"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SoftTypography>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows],
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;

