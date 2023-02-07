const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!categoryData) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json();
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, updatedRows] = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!updatedRowsCount) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating category' });
  }
});

// try {
//   const categoryData = await Category.destroy({
//     where: {
//       id: req.params.id
//     }
//   });
//   if (!categoryData) {
//     return res.status(404).json({ message: 'Category not found' });
//   }
//   res.status(200).json({ message: 'Done!' });
// } catch (err) {
//   console.error(err);
//   res.status(500).json({ message: 'Error deleting category' });
// }
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: "Couldnt find it" })
    }
    return res.status(200).json({ message: 'Done!' });
  } catch (err) {
    res.status(500).json();
  }
});

module.exports = router;
