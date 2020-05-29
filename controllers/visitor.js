'use strict';

import Visitor from '../models/visitor';
import _ from 'lodash';
import cuid from 'cuid';
// import response from '../helpers/response';
import ResponseFactory from '../helpers/response';
const data = {};

//GET
data.getAll = async (req, res) => {
  try {
    const visitor = await Visitor.find();
    const response = new ResponseFactory('ok', visitor);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//GET By ID
data.getById = async (req, res) => {
  try {
    const visitor = await Visitor.findOne({
      cuid: req.params.id
    });

    const response = new ResponseFactory('ok', visitor);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//Create
data.add = async (req, res) => {
  try {
    console.log(req.body)
    var keys = Object.keys(Visitor.schema.paths);
    console.log(keys)

    //const keys = Object.keys(Visitor.attributes);
    const body = _.pick(req.body, keys);
    console.log(body)

    const result = new Visitor(body);
    result.cuid = cuid();
    await result.save()

    const response = new ResponseFactory('ok', data);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//Update
data.present = async (req, res) => {
  try {

    let result = await Visitor.findOne({
      cuid: req.params.id
    });
    result.status = "present";
    await result.save();

    const response = new ResponseFactory('ok', data);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//remove post
data.remove = async (req, res) => {
  try {
    console.log(req.params.id)
    let result = await Visitor.findOne({
      cuid: req.params.id
    });
    console.log(result)
    if (result.status == "not") {
      await Visitor.deleteOne({
        cuid: req.params.id
      })
    } else {
      result = "can not delete this visitor"
    }
    const response = new ResponseFactory('ok', result);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

export default data;