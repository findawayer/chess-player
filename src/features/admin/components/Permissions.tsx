import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
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

import ServerError from '~/features/common/components/ServerError';
import { EDITABLE_USER_ROLES } from '~/helpers/permissions';
import { UserPayload, UserRole } from '~/types';

const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 5;

// Query: get users per page (cursor based)
const USERS_QUERY = gql`
  query UsersQuery($take: Int = ${DEFAULT_ITEMS_PER_PAGE}, $skip: Int = 0) {
    users(take: $take, skip: $skip) {
      id
      email
      name
      verified
      role
    }
  }
`;

const UPDATE_USER_ROLE_MUTATION = gql`
  mutation updateUserRole($id: ID!, $role: Role!) {
    updateUserRole(id: $id, role: $role) {
      id
      role
    }
  }
`;

interface UserRowProps {
  user: UserPayload;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentRole, setCurrentRole] = useState(user.role);
  const [updatePermissions, { error }] = useMutation(
    UPDATE_USER_ROLE_MUTATION,
    {
      variables: { id: user.id, role: currentRole },
      refetchQueries: [{ query: USERS_QUERY }],
    },
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRole((event.target as HTMLInputElement).value as UserRole);
  };
  const handleClose = () => {
    setCurrentRole(user.role);
    // Close popover
    setAnchorEl(null);
  };
  const handleSubmit = async () => {
    // Update if something changed.
    if (user.role !== currentRole) {
      try {
        await updatePermissions();
      } catch (e) {
        // Don't let Next.js display error to the user.
        return;
      }
    }
    // Close popover
    setAnchorEl(null);
  };
  const open = !!anchorEl;

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
            <ServerError error={error} />
            <List dense>
              {EDITABLE_USER_ROLES.map(role => (
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

const Permissions: React.FC = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const { error, data } = useQuery<{ users: UserPayload[] }>(USERS_QUERY, {
    variables: {
      $take: rowsPerPage,
      skip: (page + 1) * rowsPerPage - rowsPerPage,
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h2" align="center" style={{ marginBottom: 50 }}>
        Manage User Permissions
      </Typography>
      <ServerError error={error} />
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
                <UserRow key={user.id} user={user} />
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
