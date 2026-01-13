// src/router/adminRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';

// ===== MODULE IMPORTS START =====
import { AiPage } from '@modules/ai';
import { UserPage } from '@modules/user';
// ===== MODULE IMPORTS END =====

/**
 * Admin module routes configuration
 * Scripts will automatically add/remove routes between the markers
 */
export const adminRoutes = (
  <>
    {/* ===== MODULE ROUTES START ===== */}<Route path="ai" element={<AiPage />} /><Route path="user" element={<UserPage />} />{/* ===== MODULE ROUTES END ===== */}
  </>
);
