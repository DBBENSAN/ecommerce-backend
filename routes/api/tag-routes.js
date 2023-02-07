const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving tags' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving tag' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating tag' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, updatedRows] = await Tag.update({
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedRowsCount) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating tag' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsCount = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedRowsCount) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting tag' });
  }
});

module.exports = router;
