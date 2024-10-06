export async function getPing(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      message: 'pong',
    });
  } catch (error) {
    return next(error);
  }
}
