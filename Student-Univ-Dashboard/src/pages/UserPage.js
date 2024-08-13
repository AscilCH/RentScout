import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import Maison from './maison';
import EditPage from './EditPage';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'MaisonName', label: 'Nom de Maison', alignRight: false },
  { id: 'cliniques', label: 'cliniques', alignRight: false },
  { id: 'price', label: 'Loué', alignRight: false },
  { id: 'isAvailable', label: 'Status', alignRight: false },
  {},
];
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.adress.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [userList, setUserList] = useState(USERLIST);
  const [open, setOpen] = useState(null); // Existing state variable
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterAdress, setFilterAdress] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addHome, setAddHome] = useState(false);

  const fetchUserData = () => {
    // Find the user with the matching selectedUserId from the userList
    const user = USERLIST.find((user) => user.id === selectedUserId);
    // Set the selectedUserData to the found user
    setSelectedUserData(user);
  };
  console.log(USERLIST)

  useEffect(() => {
    // Call the fetchUserData function whenever selectedUserId is changed
    if (selectedUserId) {
      fetchUserData();
    }
  }, [selectedUserId]);
console.log(selectedUserData)

  const handleOpenMenu = (event, user) => {
    if (event.currentTarget.id === 'delete-option') {
      setSelectedUserId(user.id);
    }
    setOpen(event.currentTarget); // Open the popover
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleDeleteUsers = () => {
    const updatedUserList = userList.filter((user) => !selected.includes(user.id));
    setUserList(updatedUserList);
    setSelected([]);
    setSelectedUserId(null);
    setOpen(null);
  };
  
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterAdress);
  const isNotFound = !filteredUsers.length && !!filterAdress;

  const handleButtonClick = () => {
    if (selectedUserId) {
      handleDeleteUsers();
    } else {
      setAddHome(!addHome);
    }
  };
  const joinCliniques = (cliniques) => {
    return cliniques.join(', ');
  };
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Maisons
          </Typography>
        </Stack>
        {addHome ? (
          <Maison />
        ) : editMode ? (
          <EditPage userData={selectedUserData} setUserData={setSelectedUserData} setEditMode={setEditMode} />
          ) : (
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 600 }}>
                <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, MaisonName, isAvailable, cliniques, avatarUrl, price } = row;
                      const isSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isSelected} onClick={() => handleUserSelect(id)}>
                          <TableCell>
                            <Checkbox
                              color="primary"
                              checked={isSelected}
                              onChange={() => handleCheckboxClick(id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {MaisonName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{joinCliniques(cliniques)}</TableCell>

                          <TableCell align="left">{price} DT</TableCell>

                          <TableCell align="left">
                            <Label color={(isAvailable === 'indisponible' && 'error') || 'success'}>
                              {sentenceCase(isAvailable)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for&nbsp;
                              <strong>&quot;{filterAdress}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </Card>
        )}
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={() => {
          setOpen(null); // Close the popover
          setSelectedUserId(null);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setEditMode(!editMode);
            setOpen(null);
          }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {/* Always show the "Delete" option */}
        <MenuItem
  id="delete-option"
  sx={{ color: 'error.main' }}
  onClick={() => handleDeleteUsers()} // Call the function to handle the delete action
>
  <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
  Delete
</MenuItem>

      </Popover>
    </>
  );
}
