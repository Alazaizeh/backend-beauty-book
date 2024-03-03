import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Middleware to check if the user has access to the requested page/action
async function checkPermission(req, res, next) {
  const userId = req.user && /^\d+$/.test(req.user.id) ? parseInt(req.user.id) : null;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Find the user by ID and include the role and its permissions
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: { include: { permissions: { include: { page: true, action: true } } } } }
    });

    if (!user || !user.role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract allowed pages and actions from user's role's permissions
    const allowedPages = new Set();
    const allowedActions = new Set();

    user.role.permissions.forEach(permission => {
      if(permission.page)
      allowedPages.add(permission.page.name);
      if(permission.action)
      allowedActions.add(permission.action.name);
    });

    // Check if the requested page and action are allowed for the user
    const requestedPage = req.url; // Assuming the URL contains the page name
    const requestedAction = req.method; // Assuming the HTTP method corresponds to the action name

    if (!allowedPages.has(requestedPage) || !allowedActions.has(requestedAction)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // User has access, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error checking permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export default checkPermission;
