/** List of user roles — sorted from highest to lowest.  */
export const USER_ROLES = ['SUPERUSER', 'ADMIN', 'USER'] as const;
/** First role as mighty (uneditable through admin interface), rest of the roles as editable roles. */
export const [MIGHTY_USER_ROLE, ...EDITABLE_USER_ROLES] = USER_ROLES;
/** Admins are given right to the client admin page access. */
export const ADMIN_USER_ROLE = 'ADMIN' as const;
