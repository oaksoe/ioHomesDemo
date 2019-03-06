exports.create = async (db, data) => {
    return await db.insertOne(data);
}

exports.update = async (db, data, criteria) => {
    return await db.update(criteria, { $set: data });
}

exports.remove = async (db, criteria) => {
    return await db.remove(criteria);
}

exports.find = async (db, criteria) => {
    return await db.findOne(criteria);
}

exports.findAll = async (db) => {
    return await db.find().toArray();
}
