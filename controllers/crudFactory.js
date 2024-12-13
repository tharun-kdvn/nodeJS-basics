

function checkInput(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: 'Bad request'
        });
    }
    else {
        console.log("Hello from Next");
        next();
    }
}


const getAllFactory = (elementModel) => async (req, res) => {
    try {
        const data = await elementModel.find();
        if (!data) {
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else {
            res.status(200).json({
                message: 'Data Found',
                data: data
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Error occured',
            error: err
        })
    }
}

const createFactory = (elementModel) => async (req, res) => {
    try {
        console.log(req.body);
        const elementData = req.body;
        const element = await elementModel.create(elementData);
        if (element) {
            res.status(200).json(
                {
                    message: 'Item added to DB',
                    data: element,
                }
            )
        }
        else {
            res.status(404).json({
                message: 'Item not added to DB'
            })
        }

    }
    catch (err) {
        res.json({
            statusCode: 500,
            message: err,
        })
    }
}
const fetchByIdFactory = (elementModel) => async (req, res) => {
    try {
        const { id } = req.params
        const elementData = await elementModel.findById(id);
        if (!elementData) {
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else {
            res.status(200).json({
                message: 'Data Found',
                data: elementData
            })
        }

    }
    catch (err) {
        res.status(500).json({
            message: 'Error occured',
            error: err
        })
    }
}

const updateFactory = (elementModel) => async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id);
        // {new: true} will return the updated data back into element
        const element = await elementModel.findByIdAndUpdate(id, req.body, { new: true });
        console.log('user in update func', user);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                message: "User found and record updated",
                data: element,
            })
            //     }
            // })

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}
const deleteFactory = (elementModel) => async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id)
        const element = await elementModel.findByIdAndDelete(id);
        console.log('user in update func', user);
        if (!element) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                message: "User found and record deleted",
                data: element,
            })
            //     }
            // })

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    checkInput,
    getAllFactory,
    createFactory,
    fetchByIdFactory,
    updateFactory,
    deleteFactory
}
