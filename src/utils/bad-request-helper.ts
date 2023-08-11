export function sendBadRequest(req, res, message = 'Invalid payload', status = 400) {
    res.status(status);
    res.json({message})
}