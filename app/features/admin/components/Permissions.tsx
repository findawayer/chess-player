import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { UserRole } from '@prisma/client';
import type { ChangeEvent, FunctionComponent, MouseEvent } from 'react';
import { useState } from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import {
  PaginatedUser,
  UPDATE_USER_ROLE_MUTATION,
  UpdateUserRole as UpdateUserRoleMethod,
  USERS_QUERY,
} from '~app/features/admin/graphql';

/** Number of users to display in a paginated user list. */
const USERS_PER_PAGE = 10;

/** User table row */
const UserTableRow: FunctionComponent<{ user: PaginatedUser }> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentRole, setCurrentRole] = useState(user.role);
  const [updateUserRole, { error }] = useMutation<UpdateUserRoleMethod>(
    UPDATE_USER_ROLE_MUTATION,
  );
  /** Handler for clicking role button that triggers edit dialog. */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /** Handler for role radio button selection. */
  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentRole((event.target as HTMLInputElement).value as UserRole);
  };
  /** Handle for closing the edit dialog without submitting. */
  const handleClose = () => {
    setCurrentRole(user.role);
    // Close popover
    setAnchorEl(null);
  };
  /** Handler for clicking submit button. */
  const handleSubmit = async () => {
    // Update if something changed.
    if (user.role !== currentRole) {
      try {
        await updateUserRole({
          variables: { role: currentRole },
          refetchQueries: [{ query: USERS_QUERY }],
        });
      } catch (error) {
        // Don't let Next.js display error to the user.
        return;
      }
    }
    // Close popover
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </TableCell>
      <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          aria-controls={`roleEditDialog${user.id}`}
        >
          {user.role}
        </Button>
        <Popover
          id={`roleEditDialog${user.id}`}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          open={open}
          onClose={handleClose}
        >
          <Box p={2} style={{ width: 300 }}>
            <ErrorMessage error={error} />
            <List dense>
              {Object.keys(UserRole).map(role => (
                <ListItem key={role}>
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      name={`userRole${user.id}`}
                      value={role}
                      checked={role === currentRole}
                      onChange={handleRoleChange}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'someId' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={role} />
                </ListItem>
              ))}
            </List>
            <Box textAlign="right">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

/** Permission management table. */
const Permissions: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(USERS_PER_PAGE);
  const { error, data } = useQuery<{ users: PaginatedUser[] }>(USERS_QUERY, {
    variables: {
      $take: rowsPerPage,
      skip: (page + 1) * rowsPerPage - rowsPerPage,
    },
  });

  /** Handler for page selection. */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  /** Handler for rows per change selection. */
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h2" align="center" style={{ marginBottom: 50 }}>
        Manage User Permissions
      </Typography>
      <ErrorMessage error={error} />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={150}>Name</TableCell>
                <TableCell width={250}>Email</TableCell>
                <TableCell width={100}>Verified</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.users.map(user => (
                <UserTableRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data ? data.users.length : 0}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Permissions;
