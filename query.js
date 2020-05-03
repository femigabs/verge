const queries = {
    addNewUser: `
    INSERT INTO users(
    email,
    password,
    first_name,
    last_name,
    state,
    created_at,
    updated_at,
    is_admin,
    is_super_admin
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    findUserByEmail: `
    SELECT * FROM users WHERE email=($1)
    `,
    loginUser: `
    SELECT * FROM users WHERE email=$1
    `,
    addNewParcel: `
    INSERT INTO parcels(
        user_id,
        price,
        weight,
        location,
        destination,
        sender_name,
        sender_note,
        status,
        created_at,
        updated_at
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    getSpecificUserOrder: `
        SELECT * FROM parcels WHERE user_id=($1) AND id=($2)`,
    getUserOrderById: `
        SELECT * FROM parcels WHERE user_id=($1)`,
    cancelParcelOrderById: ` 
        DELETE FROM parcels WHERE user_id=($1) AND id=($2)`,
    updateOrderDestinationById: `
        UPDATE parcels SET destination=($1), user_id=($2) WHERE id=($3) RETURNING *`,
    updateOrderStatusById: `
        UPDATE parcels SET status=($1) WHERE id=($2) RETURNING *`,
    updateOrderlocationById: `
        UPDATE parcels SET location=($1) WHERE id=($2) RETURNING *`,
    getAllUserOrder: `
        SELECT * FROM parcels`,
    getStatus: `
        SELECT * FROM parcels WHERE user_id=($1) AND id=($2)`,
    findUserById: `
        SELECT * FROM users WHERE id=($1)`,
};

module.exports = queries;