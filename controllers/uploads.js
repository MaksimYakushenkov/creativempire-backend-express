// eslint-disable-next-line consistent-return
module.exports.uploadFile = (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.upload;
  const fileName = file.name.replaceAll(' ', '_');
  const path = `./uploads/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('err');
    }
    return res.send({ url: `http://localhost:3001/uploads/${fileName}` });
  });
};
