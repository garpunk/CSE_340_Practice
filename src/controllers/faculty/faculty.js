import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const faculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty,
        currentSort: sortBy
    });
};

// Route handler for faculty detail pages
const facultyDetailPage = (req, res, next) => {
  const { facultyId } = req.params;
  const facultyMember = getFacultyById(facultyId);

   if (!facultyMember) {
    const err = new Error(`Faculty ${facultyId} not found`);
    err.status = 404;
    return next(err);
  } 

   

    res.render('faculty/detail', {
    title: facultyMember.name,
    faculty: facultyMember
});
};

export { facultyListPage, facultyDetailPage };